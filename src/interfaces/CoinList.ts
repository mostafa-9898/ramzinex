export interface IConList {
    color: string,
    crypto_box: number,
    deposit: number,
    factor: number,
    has_tag: boolean,
    icon: string,
    id: number,
    international_price: number | null,
    logo: string,
    name: string,
    persian_name: string,
    precision: number,
    related_pairs: [
        number,
        number
    ],
    rial_related_pair: number,
    show_order: number,
    show_precision: number,
    symbol: string,
    url_name: string,
    withdraw: number,
    withdraw_fee: number
}