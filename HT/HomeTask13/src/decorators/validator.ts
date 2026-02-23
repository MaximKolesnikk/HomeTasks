import { HttpError } from "routing-controllers";

export function ValidateUserInput() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let body = null;

     
      for (const arg of args) {
        if (arg && typeof arg === 'object' && 'user' in arg && 'email' in arg) {
          body = arg;
          break;
        }
      }

      if (!body || typeof body !== 'object') {
        throw new HttpError(400, 'Invalid body format');
      }

      if (!body.user || body.user.length < 2) {
        throw new HttpError(400, 'User name must be at least 2 characters long');
      }

      if (!body.email || !body.email.includes('@')) {
        throw new HttpError(400, 'A valid email is required');
      }

      
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}