
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
        __v: number;
}

export interface ILoginData {
    accessToken: string;
    user: IUser;
}