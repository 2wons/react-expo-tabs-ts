
/**
 * Represents an error detail.
 * @property message - The error message.
 * @property propertyName - The property name.
 */
export interface ErrorDetail {
    message: string
    propertyName: string
}

/**
 * Represents an error response.
 * @property statusCode - The status code of the error.
 * @property message - The error message.
 * @property details - The error details.
 */
export interface ErrorResponse {
    statusCode: number
    message: string
    details: ErrorDetail[]
}

/**
 * Represents a login data transfer object.
 * @property email - The email of the user.
 * @property password - The password of the user.
 */
export interface LoginDTO {
    email: string
    password: string
}

/**
 * Represents a register data transfer object.
 * @property name - The name of the user.
 * @property email - The email of the user.
 * @property password - The password of the user.
 */
export interface RegisterDTO {
    name: string
    email: string
    password: string
}

/**
 * Represents a reset data transfer object.
 * @property newPassword - The new password.
 * @property oldPassword - The old password.
 */
export interface ResetDTO {
    newPassword: string
    oldPassword: string
}

export interface Dentist {

}

export interface Clinic {
    distance: number
    latitude: number
    longitude: number
    dentists: {
        email: string
        name: string
        phoneNumber: string
    }[]
    id: number
    name: string
    address: string
    phoneNumber: string
    description: string
    email: string
    imagePath: string
    website: string
}