import { disabled, min, minLength, required, pattern, schema } from '@angular/forms/signals';

export interface IGuest {
  id: number;
  name: string;
  guestCount: number;
  foodPrice: number;
  isPresent: boolean;
  invited: boolean;
  gemeinde: string;
  phone: string;
}

export function createInitialGuest(): IGuest {
  return {
    id: 0,
    name: '',
    guestCount: 2,
    foodPrice: 13,
    isPresent: true,
    invited: false,
    gemeinde: '',
    phone: '',
  };
}

export const guestSchema = schema<IGuest>((rootPath) => {
  required(rootPath.name, { message: 'Name is required' });
  minLength(rootPath.name, 2, {
    message: 'Name must be at least 2 characters long',
  });
  required(rootPath.guestCount, { message: 'Guest count is required' });
  min(rootPath.guestCount, 1, {
    message: 'Guest count must be at least 1',
  });
  disabled(rootPath.foodPrice);
  required(rootPath.gemeinde, { message: 'Gemeinde is required' });
  required(rootPath.phone, { message: 'Phone number is required' });
  pattern(rootPath.phone, /^[\d\s\-\+\(\)]+$/, {
    message: 'Phone number must be valid',
  });
});
