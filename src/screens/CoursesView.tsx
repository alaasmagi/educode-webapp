import { useState } from "react";
import "../App.css";
import ContainerCardSmall from "../components/ContainerCardSmall";
import NormalLink from "../components/Link";
import TextBox from "../components/TextBox";
import SideBar from "../layout/SideBar";
import NormalButton from "../components/NormalButton";
import DropDownList from "../components/DropdownList";
import DataField from "../components/DataField";
import QuickNavigation from "../layout/QuickNavigation";
import { useNavigation } from "react-router-dom";

function CoursesView() {
  const [navState, setNavState] = useState<string>("Main");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const navigate = useNavigation;

  return (
    <>
      <SideBar />
      <div className="flex max-h-screen max-w-screen items-center justify-center md:pl-90">
        <div className="flex flex-col gap-5">
          {navState === "Main" && (
            <div className="flex flex-col max-md:w-90 md:w-xl bg-main-dark rounded-3xl p-6 gap-5">
              <TextBox
                icon="search-icon"
                placeHolder="Search by course name or code"
              />
              <ContainerCardSmall
                boldLabelA="Kasutajaliidesed"
                boldLabelB="(ITI0209)"
                linkText="View"
                onClick={() => setNavState("Details")}
              />
              <ContainerCardSmall
                boldLabelA="Kasutajaliidesed"
                boldLabelB="(ITI0209)"
                linkText="View"
                onClick={console.log}
              />
              <ContainerCardSmall
                boldLabelA="Kasutajaliidesed"
                boldLabelB="(ITI0209)"
                linkText="View"
                onClick={console.log}
              />
              <ContainerCardSmall
                boldLabelA="Kasutajaliidesed"
                boldLabelB="(ITI0209)"
                linkText="View"
                onClick={console.log}
              />
              <NormalLink
                text="Add new course"
                onClick={() => setNavState("Create")}
              />
            </div>
          )}
          {navState === "Create" && (
            <div className="flex flex-col max-md:w-90 md:w-xl bg-main-dark rounded-3xl p-6">
              <span className="text-2xl font-bold self-start">
                {"Add course"}
              </span>

              <div className="flex flex-col gap-5 items-center justify-center self-center">
                <TextBox icon="school-icon" placeHolder="Course name" />
                <TextBox icon="pincode-icon" placeHolder="Course code" />
                <DropDownList
                  icon="event-status-icon"
                  options={[]}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  label="course status"
                />
                <NormalButton text="Add course" onClick={console.log} />
              </div>
            </div>
          )}
          {navState === "Details" && (
            <>
              <div className="flex flex-col max-md:w-90 md:w-xl bg-main-dark rounded-3xl gap-10 p-6">
                <span className="text-2xl font-bold self-start">
                  {"Course details"}
                </span>
                <div>
                  <DataField fieldName="Course name" data="Kasutajaliidesed" />
                  <DataField fieldName="Course code" data="ITI0209" />
                  <DataField fieldName="Status" data="Available" />
                </div>
                <div className="flex justify-between">
                  <NormalLink text="Edit details" onClick={console.log} />
                  <NormalLink text="Delete course" onClick={console.log} />
                </div>
              </div>
              <QuickNavigation
                quickNavItemA={{
                  label: "Add new attendance in this course",
                  onClick: () => navigate("/Statistics"),
                }}
                quickNavItemB={{
                  label: "View statistics of this course",
                  onClick: () => navigate("/Statistics"),
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CoursesView;
