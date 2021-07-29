import { Boarder } from "@reslife/shared-models";

export interface BoarderAction {
    boarder: Boarder;
    action: 'edit' | 'delete';
}
