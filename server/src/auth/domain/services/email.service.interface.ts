export interface IEmailService {
  sendCredentials(email: string, password: string): Promise<void>;
}
