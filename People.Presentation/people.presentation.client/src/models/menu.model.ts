export interface IMenuListItem {
    id: number;
    text: string;
    isSelected: boolean;
    icon: any;
    linkTo: string;
    value?: number;
    roles?: string[];
    subMenu?: ISubMenuListItem[];
}

export interface ISubMenuListItem {
    id: number;
    text: string;
    isSelected: boolean;
    icon: any;
    linkTo: string;
    value?: number;
}