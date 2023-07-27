import { useState, useRef } from 'react';
import {AlertPopup} from "@/components/Util/Popup";
import CustomEditor from "@/components/Util/CustomEditor";
import CustomDatePickcer from "@/components/Util/CustomDatePicker";
import FileInfo from "@/components/Util/FileInfo";

const StudyInsert1Step: React.FC = () => {
    const [AlertPopupFlag, setAlertPopupFlag] = useState(false);
    const [AlertPopupTitle, setAlertPopupTitle] = useState("");
    const today = new Date();
    const titleInput:React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const descInput:React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const startDateInput:React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const endDateInput:React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const profileInput:React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const AlertPopupInfo = {
        PopupStatus : AlertPopupFlag,
        zIndex : 10000,
        maxWidth: 440,
        PopupTitle : AlertPopupTitle,
        ClosePopupProp : () => changePopupFlag(false),
    }

    const changePopupFlag = (flag: boolean) => {
        setAlertPopupFlag(() => flag);
    };

    //폼 submit 이벤트
    const formSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if(titleInput.current == null || titleInput.current.value == ''){
            setAlertPopupTitle("제목을 입력해주세요");
            changePopupFlag(true);
            return;
        }

        if(titleInput.current == null || titleInput.current.value == ''){
            setAlertPopupTitle("제목을 입력해주세요");
            changePopupFlag(true);
            return;
        }

        const params:object = {};

        console.log(params);

        return;
    }

    return (
        <form className="col-12" encType="multipart/form-data" onSubmit={(e) => formSubmit(e)}>
            <div className="col-12 mb37 form_style_0_con">
                <div className="col-12 form_style_0">
                    <div className="col-12 col-md-0 label_box">
                        <label htmlFor="studyInsertTitle" className="essential">제목</label>
                    </div>
                    <div className="col-12 col-md-0 input_box">
                        <input type="text" id="studyInsertTitle" className="input_style_0" placeholder="제목을 입력해주세요" ref={titleInput} />
                    </div>
                </div>
                <div className="col-12 form_style_0">
                    <div className="col-12 col-md-0 label_box">
                        <span>내용</span>
                    </div>
                    <div className="col-12 col-md-0 input_box">
                        <input type="hidden" ref={descInput}/>
                        <CustomEditor resultInput={descInput} />
                    </div>
                </div>
                <div className="col-12 form_style_0 type_date_range">
                    <div className="col-12 col-md-0 label_box">
                        <span className="essential">기간</span>
                    </div>
                    <div className="col-12 col-md-0 input_box">
                        <input type="hidden" ref={startDateInput} />
                        <CustomDatePickcer resultInput={startDateInput} settingDate={today} />
                        <span className="addr_text">-</span>
                        <input type="hidden" ref={endDateInput} />
                        <CustomDatePickcer resultInput={endDateInput} settingDate={today} />
                    </div>
                </div>
                <div className="col-12 form_style_0 type_file">
                    <div className="col-12 col-md-0 label_box">
                        <span>대표 이미지</span>
                    </div>
                    <div className="col-12 col-md-0 input_box">
                        <div className="col-12 mb12 addr_text">형식은 png, jpg, jpeg만 가능합니다.</div>
                        <button type="button" className="col-0 btn_style_0 bg_black border_none" onClick={() => profileInput.current?.click()}>이미지 등록</button>
                        <FileInfo inheritRef={profileInput} multi={true}/>
                    </div>
                </div>
            </div>
            <div className="col-12 tc btn_style_0_con">
                <button className="btn_style_0 mr15">취소</button>
                <button type="submit" className="btn_style_0 bg_point0">만들기</button>
            </div>
            <AlertPopup PopupInfo={AlertPopupInfo} />
        </form>
    )
};

export default StudyInsert1Step;