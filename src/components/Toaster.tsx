import toast from "react-hot-toast";

import {
    XIcon
} from '@heroicons/react/solid'
import { ResponseStatus } from "../interfaces";
import React from "react";

export interface ToasterMessage {
    status: ResponseStatus,
    title: string,
    content: string
}

export const notify = (message: ToasterMessage, bg: string) => toast.custom(
    (t) => {
        return (
            <div className={"toaster"} style={{ top: t.visible ? 0 : "-24rem", backgroundColor: bg}}>
                <div className="toaster-inner">
                    <h1>{message.title}</h1>
                    <p>
                        {message.content}
                    </p>
                </div>
                <div className="toaster-dismiss" onClick={() => toast.dismiss(t.id)}>
                    <XIcon className="toaster-icon" aria-hidden="true" />
                </div>
            </div>
        )
    },
    { id: "unique-notification", position: "top-center" }
)

export const getNotifyBG = (status: ResponseStatus) => {
    var bg: string = "#34D399"
    switch (status) {
        case ResponseStatus.SUCCESS:
            bg = "#34D399"
            break;
        case ResponseStatus.FAIL:
            bg = "#F87171"
            break;
        case ResponseStatus.WARNING:
            bg = "#FBBF24"
            break;
        default:
            bg = "#9CA3AF"
    }
    return bg
}