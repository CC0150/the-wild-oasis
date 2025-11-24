export interface Cabin {
  id?: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
  image?: FileList | string;
}

export interface FormValues {
  name: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
  image?: FileList | string;
}

export interface CreateCabinFormProps {
  cabinToEdit?: Cabin;
  onClose?: () => void;
}

export interface CabinRowProps {
  cabin: Cabin;
}
