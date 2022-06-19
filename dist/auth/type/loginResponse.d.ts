export interface LoginResponse {
    id: string;
    fullname: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
    department?: string;
    profilePicture?: string;
}
