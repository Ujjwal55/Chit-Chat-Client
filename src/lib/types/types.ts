
export interface IAxiosErrorResponse {
    message: string,
    response: {
        data: {
            success: boolean;
            message: string;
        },
        status: number;
    },
}

export interface IUser {
        _id: string;
        fullName: string;
        createdAt: Date;
        email: string;
        isVerified: boolean;
        lastLogin: Date | null;
        updatedAt: Date;
        userName: string;
        profileImageURL: string;
        friendShipStatus: string;
        __v: number;
}

export interface ILoginData {
    accessToken: string;
    user: IUser;
}

export interface IChat {
    name: string;
    _id: string;
    members: Array<IUser>;
    groupChat: boolean;
}

export interface IMessage {
        content: string;
        chat: string;
        createdAt: string;
        sender: IUser;
        _id: string;
        attachments: Array<string>;
}
export interface IChatMessage {
    chatId: string;
    message: IMessage
}

export interface IMessageAlert {
    chatId: string;
    count: number;
}