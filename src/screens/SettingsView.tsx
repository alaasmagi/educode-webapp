import { useEffect, useState } from "react";
import "../App.css";
import NormalLink from "../components/Link";
import NormalButton from "../components/NormalButton";
import SuccessMessage from "../components/SuccessMessage";
import SideBar from "../layout/SideBar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LocalUserData from "../models/LocalUserDataModel";
import { DeleteCurrentLanguage, DeleteOfflineUserData, GetOfflineUserData } from "../businesslogic/UserDataOffline";
import NormalMessage from "../components/NormalMessage";
import ErrorMessage from "../components/ErrorMessage";
import { CourseAttendance } from "../models/CourseAttendanceModel";
import { DeleteUser } from "../businesslogic/UserDataFetch";

function SettingsView() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localData, setLocalData] = useState<LocalUserData | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData = await GetOfflineUserData();
    if (userData == null) {
      navigate("/");
      return;
    }
    setLocalData(userData);
  };

  const handleDelete = async () => {
    const status = localData?.uniId && await DeleteUser(localData.uniId);
    if (typeof(status) !== "string") {
      await DeleteCurrentLanguage();
      await DeleteOfflineUserData();
      navigate("/delete-account-success");
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleLogout = async () => {
    await DeleteOfflineUserData();
    navigate("/account-logout-success");
  };

  return (
    <>
      <SideBar />
      <div className="flex max-h-screen max-w-screen items-center justify-center md:pl-90">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col max-md:w-90 md:w-xl bg-main-dark rounded-3xl p-6 gap-5">
            <span className="text-2xl font-bold self-start">
              {t("settings")}
            </span>
            <div className="py-4 flex justify-center">
              {successMessage && <SuccessMessage text={t(successMessage)} />}
              {normalMessage && <NormalMessage text={t(normalMessage)} />}
              {errorMessage && <ErrorMessage text={t(errorMessage)} />}
            </div>
            <div className="flex flex-col self-center py-5">
              <div className="flex flex-col gap-4">
              <NormalButton text={t("change-password")} onClick={() => navigate("/PasswordRecovery")} />
              <NormalButton text={t("log-out")} onClick={handleLogout} />
              </div>
              <NormalLink text={t("delete-account")} onClick={handleDelete}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingsView;
