export interface IGuest {
  id: number;
  name: string;
  guestCount: number;
  foodPrice: number;
  isPresent: boolean;
  gemeinde?: string;
}
