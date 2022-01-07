import React, { ReactNode } from "react";
import FormDialogComponent from "components/editorComponents/form/FormDialogComponent";
import { ControlGroup } from "@blueprintjs/core";
import styled from "styled-components";
import _, { noop } from "lodash";
import SearchInput, { SearchVariant } from "components/ads/SearchInput";
import Button, { Size } from "components/ads/Button";
import { useSelector } from "react-redux";
import { getIsFetchingApplications } from "selectors/applicationSelectors";
import { Indices } from "constants/Layers";
import { useIsMobileDevice } from "utils/hooks/useDeviceDetect";

const SubHeaderWrapper = styled.div<{
  isMobile?: boolean;
}>`
  width: 250px;
  display: flex;
  justify-content: space-between;
  position: ${({ isMobile }) => (isMobile ? `relative` : `fixed`)};
  background: ${(props) => props.theme.colors.homepageBackground};
  top: ${({ isMobile }) => (isMobile ? `12px` : `2px`)};
  left: ${(props) =>
    props.isMobile ? 16 : props.theme.homePage.sidebar + 24}px;
  z-index: ${Indices.Layer9};
`;
const SearchContainer = styled.div`
  flex-grow: 1;
  .bp3-control-group {
    display: block;
  }
  && {
    .bp3-input {
      width: 40%;
    }
  }
`;

type SubHeaderProps = {
  add?: {
    form: ReactNode;
    title: string;
    formName: string;
    isAdding: boolean;
    formSubmitIntent: string;
    errorAdding?: string;
    formSubmitText: string;
    onClick: () => void;
  };
  search?: {
    placeholder: string;
    debounce?: boolean;
    queryFn?: (keyword: string) => void;
    defaultValue?: string;
  };
};

export function ApplicationsSubHeader(props: SubHeaderProps) {
  const isFetchingApplications = useSelector(getIsFetchingApplications);
  const isMobile = useIsMobileDevice();
  const query =
    props.search &&
    props.search.queryFn &&
    _.debounce(props.search.queryFn, 250, { maxWait: 1000 });
  const createTrigger = props.add && (
    <Button size={Size.medium} text={props.add.title} />
  );

  return (
    <SubHeaderWrapper isMobile={isMobile}>
      <SearchContainer>
        {props.search && (
          <ControlGroup>
            <SearchInput
              cypressSelector={"t--application-search-input"}
              defaultValue={props.search.defaultValue}
              disabled={isFetchingApplications}
              onChange={query || noop}
              placeholder={props.search.placeholder}
              variant={SearchVariant.BACKGROUND}
            />
          </ControlGroup>
        )}
      </SearchContainer>

      {props.add && (
        <FormDialogComponent
          Form={props.add.form}
          title={props.add.title}
          trigger={createTrigger}
        />
      )}
    </SubHeaderWrapper>
  );
}

export default ApplicationsSubHeader;
