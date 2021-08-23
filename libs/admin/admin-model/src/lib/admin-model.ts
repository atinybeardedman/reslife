import { Role, SimpleItem } from '@reslife/shared-models'
export interface StaffMember extends SimpleItem {
    email: string;
    roles: Role[];
}