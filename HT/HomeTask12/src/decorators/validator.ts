import { HttpError } from 'routing-controllers';

export function ValidateArgs(test: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log('Arguments in decorator:', args);

      const body = args[0]; 
      console.log('Extracted body:', body);

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