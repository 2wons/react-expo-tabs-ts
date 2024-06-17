
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

/**
 * Represents a Dentist.
 * @property email - The email of the Dentist.
 * @property name - The name of the Dentist.
 * @property phoneNumber - The phone number of the Dentist.
 */
export interface Dentist {
  email: string
  name: string
  phoneNumber: string
}

export interface Clinic {
    distance: number
    latitude: number
    longitude: number
    dentists: Dentist[]
    id: number
    name: string
    address: string
    phoneNumber: string
    description: string
    email: string
    imagePath: string
    website: string
}

export interface Appointment {
  id: number
  clinic: Clinic
  dentist: Dentist[]
  scheduledAt: string
  clinicMessage: string
  status: string
}

export interface AppointmentsResponse extends Array<Appointment> {}

export interface ImageResponse {
    createdAt: string;
    height: number;
    id: number;
    width: number;
    detections: {
      confidence: number;
      classId: number;
      height: number;
      id: number;
      width: number;
      x: number;
      y: number;
      bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
        location: {
          x: number;
          y: number;
          isEmpty: boolean;
        };
        size: {
          width: number;
          height: number;
          isEmpty: boolean;
        };
        isEmpty: boolean;
        top: number;
        right: number;
        bottom: number;
        left: number;
      };
      className: string;
    }[];
    name: string;
    originalImagePath: string;
    plottedImagePath: string;
  }