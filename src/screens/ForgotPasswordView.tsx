import "../App.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NormalButton from "../components/NormalButton";
import TextBox from "../components/TextBox";
import NormalLink from "../components/Link";
import ErrorMessage from "../components/ErrorMessage";
import NormalMessage from "../components/NormalMessage";
import UnderlineText from "../components/UnderlineText";
import LanguageSwitch from "../components/LanguageSwitch";

import {
  RequestOTP,
  VerifyOTP,
  ChangeUserPassword,
} from "../businesslogic/UserDataFetch";

import { RegexFilters } from "../helpers/RegexFilters";
import VerifyOTPModel from "../models/VerifyOTPModel";
import ChangePasswordModel from "../models/ChangePasswordModel";

function ForgotPasswordView() {
  const [stepNr, setStepNr] = useState(1);
  const [uniId, setUniId] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const showTemporaryError = useCallback((message: string) => {
    setErrorMessage(message);
    const timeout = setTimeout(() => setErrorMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const isStudentIDFormValid = () => 1; //RegexFilters.uniId.test(uniId);
  const isPasswordFormValid = () =>
    password.length >= 8 && password === passwordAgain;

  useEffect(() => {
    if (!isStudentIDFormValid() && uniId !== "") {
      setNormalMessage(t("all-fields-required-message"));
    } else {
      setNormalMessage("");
    }
  }, [uniId]);

  useEffect(() => {
    if (password.length < 8 && password !== "") {
      setNormalMessage(t("password-length-message"));
    } else if (!isPasswordFormValid() && password && passwordAgain) {
      setNormalMessage(t("password-match-message"));
    } else {
      setNormalMessage("");
    }
  }, [password, passwordAgain]);

  const handleOTPRequest = useCallback(async () => {
    const status = await RequestOTP(uniId);
    if (status) {
      setStepNr(2);
    } else {
      showTemporaryError(t("no-account-found"));
    }
  }, [uniId, t, showTemporaryError]);

  const handleOTPVerification = useCallback(async () => {
    const otpData: VerifyOTPModel = { uniId, otp: emailCode };
    const status = await VerifyOTP(otpData);
    if (status) {
      setStepNr(3);
    } else {
      showTemporaryError(t("wrong-otp"));
    }
  }, [uniId, emailCode, t, showTemporaryError]);

  const handlePasswordChange = useCallback(async () => {
    const model: ChangePasswordModel = { uniId, newPassword: password };
    const status = await ChangeUserPassword(model);
    if (status) {
      navigate("/Login", {
        state: { successMessage: t("password-change-success") },
      });
    } else {
      showTemporaryError(t("account-create-error"));
    }
  }, [uniId, password, t, navigate, showTemporaryError]);

  const sharedMessage = errorMessage || normalMessage;
  const messageComponent = errorMessage ? (
    <ErrorMessage text={errorMessage} />
  ) : (
    <NormalMessage text={normalMessage ?? ""} />
  );

  const renderStep = () => {
    switch (stepNr) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-10">
              <div className="flex min-w-2xs flex-col gap-5">
                <UnderlineText text={t("verify-account")} />
                <TextBox
                  icon="person-icon"
                  placeHolder="Uni-ID"
                  value={uniId}
                  onChange={(text) => setUniId(text.trim())}
                />
                {sharedMessage && messageComponent}
              </div>
              <div className="flex flex-col self-center justify-center ">
                <NormalButton
                  text={t("continue")}
                  onClick={handleOTPRequest}
                  isDisabled={!isStudentIDFormValid()}
                />
                <div className="flex flex-col gap-4">
                  <NormalLink
                    text={t("something-wrong-back")}
                    onClick={() => navigate(-1)}
                  />
                  <LanguageSwitch linkStyle={true} />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-10">
              <div className="flex min-w-2xs flex-col gap-5">
                <UnderlineText
                  text={`${t("one-time-key-prompt")} ${uniId}@taltech.ee`}
                />
                <TextBox
                  icon="pincode-icon"
                  placeHolder={t("one-time-key")}
                  value={emailCode}
                  onChange={(text) => setEmailCode(text.trim())}
                />
                {sharedMessage && messageComponent}
              </div>
              <div className="flex flex-col self-center justify-center ">
                <NormalButton
                  text={t("continue")}
                  onClick={handleOTPVerification}
                  isDisabled={!RegexFilters.defaultId.test(emailCode)}
                />
                <div className="flex flex-col gap-4">
                  <NormalLink
                    text={t("something-wrong-back")}
                    onClick={() => setStepNr(1)}
                  />
                  <LanguageSwitch linkStyle={true} />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-10">
              <div className="flex min-w-2xs flex-col gap-5">
                <UnderlineText text={t("set-new-password")} />
                <div className="flex min-w-2xs flex-col gap-5">
                  <TextBox
                    icon="lock-icon"
                    placeHolder={t("password")}
                    isPassword
                    value={password}
                    onChange={(text) => setPassword(text.trim())}
                  />
                  <TextBox
                    icon="lock-icon"
                    placeHolder={t("repeat-password")}
                    isPassword
                    value={passwordAgain}
                    onChange={(text) => setPasswordAgain(text.trim())}
                  />
                </div>
                {sharedMessage && messageComponent}
              </div>
              <div className="flex flex-col self-center justify-center ">
                <NormalButton
                  text={t("continue")}
                  onClick={handlePasswordChange}
                  isDisabled={!isPasswordFormValid()}
                />
                <div className="flex flex-col gap-4">
                  <NormalLink
                    text={t("something-wrong-back")}
                    onClick={() => setStepNr(2)}
                  />
                  <LanguageSwitch linkStyle={true} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="max-h-screen max-w-screen flex items-center justify-center gap-10">
        <div className="flex flex-col md:p-20 max-md:p-10 items-center gap-20 bg-main-dark rounded-3xl">
          <img src="../logos/splash-logo.png" className="md:w-xl" />
          {renderStep()}
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordView;
