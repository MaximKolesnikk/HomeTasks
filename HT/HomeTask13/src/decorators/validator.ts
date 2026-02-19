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

      console.log('[ВАЛИДАТОР] Знайдений body:', body);
      console.log('[ВАЛИДАТОР] typeof body:', typeof body);
      if (body) {
        console.log('[ВАЛИДАТОР] Ключи:', Object.keys(body));
        console.log('[ВАЛИДАТОР] user:', body.user, 'довжина:', body.user?.length);
        console.log('[ВАЛИДАТОР] email:', body.email);
      } else {
        console.log('[ВАЛИДАТОР] body не знайдено!');
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

      console.log('[ВАЛИДАТОР] OK, валідація пройдена');
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}