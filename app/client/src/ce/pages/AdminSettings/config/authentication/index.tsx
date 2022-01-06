import React from "react";
import {
  GOOGLE_SIGNUP_SETUP_DOC,
  GITHUB_SIGNUP_SETUP_DOC,
} from "constants/ThirdPartyConstants";
import {
  SettingCategories,
  SettingTypes,
  SettingSubtype,
  AdminConfigType,
} from "@appsmith/pages/AdminSettings/config/types";

import { AuthPage, AuthMethodType } from "./AuthPage";
import Google from "assets/images/Google.png";
import SamlSso from "assets/images/saml.svg";
import Github from "assets/images/Github.png";
import Lock from "assets/images/lock-password-line.svg";
import { getAppsmithConfigs } from "../../../../configs";
const {
  disableLoginForm,
  enableGithubOAuth,
  enableGoogleOAuth,
} = getAppsmithConfigs();
const Form_Auth: AdminConfigType = {
  type: SettingCategories.FORM_AUTH,
  controlType: SettingTypes.GROUP,
  title: "Form Login",
  canSave: true,
  settings: [
    {
      id: "APPSMITH_FORM_LOGIN_DISABLED",
      category: SettingCategories.FORM_AUTH,
      subCategory: "form login",
      controlType: SettingTypes.TOGGLE,
      label: "Form Login Option",
      toggleText: (value: boolean) => {
        if (value) {
          return "Enable form login/signup";
        } else {
          return " Disable form login/signup";
        }
      },
    },
    {
      id: "APPSMITH_SIGNUP_DISABLED",
      category: SettingCategories.FORM_AUTH,
      subCategory: "form signup",
      controlType: SettingTypes.TOGGLE,
      label: "Signup",
      toggleText: (value: boolean) => {
        if (value) {
          return "Allow invited users to signup";
        } else {
          return " Allow all users to signup";
        }
      },
    },
  ],
};

const Google_Auth: AdminConfigType = {
  type: SettingCategories.GOOGLE_AUTH,
  controlType: SettingTypes.GROUP,
  title: "Google Auth",
  canSave: true,
  settings: [
    {
      id: "APPSMITH_OAUTH2_GOOGLE_READ_MORE",
      category: SettingCategories.GOOGLE_AUTH,
      subCategory: "google signup",
      controlType: SettingTypes.LINK,
      label: "How to configure?",
      url: GOOGLE_SIGNUP_SETUP_DOC,
    },
    {
      id: "APPSMITH_OAUTH2_GOOGLE_CLIENT_ID",
      category: SettingCategories.GOOGLE_AUTH,
      subCategory: "google signup",
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: "Client ID",
    },
    {
      id: "APPSMITH_OAUTH2_GOOGLE_CLIENT_SECRET",
      category: SettingCategories.GOOGLE_AUTH,
      subCategory: "google signup",
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: "Client Secret",
    },
    {
      id: "APPSMITH_SIGNUP_ALLOWED_DOMAINS",
      category: SettingCategories.GOOGLE_AUTH,
      subCategory: "google signup",
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: "Allowed Domains",
      placeholder: "domain1.com, domain2.com",
    },
  ],
};

const Github_Auth: AdminConfigType = {
  type: SettingCategories.GITHUB_AUTH,
  controlType: SettingTypes.GROUP,
  title: "Github Auth",
  canSave: true,
  settings: [
    {
      id: "APPSMITH_OAUTH2_GITHUB_READ_MORE",
      category: SettingCategories.GITHUB_AUTH,
      subCategory: "github signup",
      controlType: SettingTypes.LINK,
      label: "How to configure?",
      url: GITHUB_SIGNUP_SETUP_DOC,
    },
    {
      id: "APPSMITH_OAUTH2_GITHUB_CLIENT_ID",
      category: SettingCategories.GITHUB_AUTH,
      subCategory: "github signup",
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: "Client ID",
    },
    {
      id: "APPSMITH_OAUTH2_GITHUB_CLIENT_SECRET",
      category: SettingCategories.GITHUB_AUTH,
      subCategory: "github signup",
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: "Client Secret",
    },
  ],
};

export const Form_Auth_Callout: AuthMethodType = {
  id: "APPSMITH_FORM_LOGIN_AUTH",
  category: SettingCategories.FORM_AUTH,
  label: "Form Login",
  subText: "Enable your organization to sign in with Google (OAuth).",
  image: Lock,
  type: "LINK",
  isConnected: !disableLoginForm,
  // Keeping this here for reference
  // calloutBanner: {
  //   actionLabel: "Learn More",
  //   title: "User Emails Ids are not verified.",
  //   type: "Warning",
  // },
};

export const Google_Auth_Callout: AuthMethodType = {
  id: "APPSMITH_GOOGLE_AUTH",
  category: SettingCategories.GOOGLE_AUTH,
  label: "Google",
  subText: "Enable your organization to sign in with Google (OAuth).",
  image: Google,
  type: "LINK",
  isConnected: enableGoogleOAuth,
};

export const Github_Auth_Callout: AuthMethodType = {
  id: "APPSMITH_GITHUB_AUTH",
  category: SettingCategories.GITHUB_AUTH,
  label: "Github",
  subText: `Enable your organization to sign in with your preferred SAML2 compliant provider like Ping
      Identity, Google SAML, Keycloak, or VMware Identity Manager.`,
  image: Github,
  type: "LINK",
  isConnected: enableGithubOAuth,
};

export const Saml_Auth_Callout: AuthMethodType = {
  id: "APPSMITH_SAML_AUTH",
  label: "SAML 2.0",
  subText: `Enable your organization to sign in with your preferred SAML2 compliant provider like Ping
      Identity, Google SAML, Keycloak, or VMware Identity Manager.`,
  image: SamlSso,
  needsUpgrade: true,
  type: "OTHER",
};

const AuthMethods = [
  Google_Auth_Callout,
  Saml_Auth_Callout,
  Github_Auth_Callout,
  Form_Auth_Callout,
];

function AuthMain() {
  return <AuthPage authMethods={AuthMethods} />;
}

export const config: AdminConfigType = {
  type: SettingCategories.AUTHENTICATION,
  controlType: SettingTypes.PAGE,
  title: "Authentication",
  canSave: false,
  children: [Form_Auth, Google_Auth, Github_Auth],
  component: AuthMain,
};