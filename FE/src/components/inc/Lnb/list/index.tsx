import React, {useState} from "react";
import {getList} from "@/api/study";
import LnbFilter from "./item/Filter";
import LnbListItem from "./item/ListItem";
import { StudyType } from "@/type/StudyType";
import LnbStyle from "@/res/css/module/Lnb.module.css";

const param = {user : 1};
const originStudyList:Array<StudyType> = await getList(param) as Array<StudyType>;

const List: React.FC = () => {
    const [studyList, setStudyList] = useState(originStudyList);
    const searchKeyWord = (data: string) => {
        setStudyList(originStudyList.filter((item) => {if(item.title.indexOf(data) > -1) return item;}));
    }
    //리스트가 존재할 때
    if(studyList.length > 0){
        return (
            <ul className="col-12">
                <LnbFilter searchKeyWord={searchKeyWord}/>
                {studyList.map(item => <LnbListItem key={item.studyInfoId} item={item} />)}
            </ul>
        )    
    } else { //리스트가 존재하지 않을 때
        return (
            <ul className="col-12">
                <LnbFilter searchKeyWord={searchKeyWord}/>
                <div className={`col-12 ${LnbStyle.no_data}`}>
                    해당하는 스터디가 없습니다.
                </div>
            </ul>
        )
    }
    
};

export default List;