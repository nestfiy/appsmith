import { ReduxActionTypes, ReduxAction } from "constants/ReduxActionConstants";
import {
  all,
  call,
  put,
  takeLatest,
  select,
  putResolve,
  take,
} from "redux-saga/effects";
import { setRecentAppEntities, fetchRecentAppEntities } from "utils/storage";
import {
  restoreRecentEntitiesSuccess,
  setRecentEntities,
} from "actions/globalSearchActions";
import { AppState } from "reducers";
import {
  getCurrentApplicationId,
  getIsEditorInitialized,
} from "selectors/editorSelectors";
import { RecentEntity } from "components/editorComponents/GlobalSearch/utils";
import log from "loglevel";

const getRecentEntitiesKey = (applicationId: string) => applicationId;

export function* updateRecentEntity(actionPayload: ReduxAction<RecentEntity>) {
  try {
    const applicationId = yield select(getCurrentApplicationId);

    const recentEntitiesRestored = yield select(
      (state: AppState) => state.ui.globalSearch.recentEntitiesRestored,
    );
    const isEditorInitialised = yield select(getIsEditorInitialized);

    const waitForEffects = [];

    if (!isEditorInitialised) {
      waitForEffects.push(take(ReduxActionTypes.INITIALIZE_EDITOR_SUCCESS));
    }

    if (!recentEntitiesRestored) {
      waitForEffects.push(
        take(ReduxActionTypes.RESTORE_RECENT_ENTITIES_SUCCESS),
      );
    }

    yield all(waitForEffects);

    const { payload: entity } = actionPayload;
    let recentEntities = yield select(
      (state: AppState) => state.ui.globalSearch.recentEntities,
    );

    recentEntities = recentEntities.slice();

    recentEntities = recentEntities.filter(
      (recentEntity: { type: string; id: string }) =>
        recentEntity.id !== entity.id,
    );
    recentEntities.unshift(entity);
    recentEntities = recentEntities.slice(0, 6);

    yield put(setRecentEntities(recentEntities));
    if (applicationId) {
      yield call(
        setRecentAppEntities,
        recentEntities,
        getRecentEntitiesKey(applicationId),
      );
    }
  } catch (e) {
    log.error(e);
  }
}

export function* restoreRecentEntities(
  actionPayload: ReduxAction<{ applicationId: string }>,
) {
  const {
    payload: { applicationId },
  } = actionPayload;
  const recentAppEntities = yield call(
    fetchRecentAppEntities,
    getRecentEntitiesKey(applicationId),
  );
  yield putResolve(setRecentEntities(recentAppEntities));
  yield put(restoreRecentEntitiesSuccess());
}

export default function* globalSearchSagas() {
  yield all([
    takeLatest(ReduxActionTypes.UPDATE_RECENT_ENTITY, updateRecentEntity),
    takeLatest(
      ReduxActionTypes.RESTORE_RECENT_ENTITIES_REQUEST,
      restoreRecentEntities,
    ),
  ]);
}
