import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, SetStateAction } from "react";
import { Timestamp } from 'firebase/firestore';

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IUser {
    _id: string
    avatar?: string
    name: string
    city?: string
    gender?: string
    about?: string
    email?: string
}

export interface IPost {
    id: string;
    author: IUser
    createdAt: Timestamp | Date
    content: string
    images?: string[]
}


export interface IMenuItem {
    title: string
    link: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}

export interface IUserData {
    email: string
    password: string
    name: string
}