export interface IProductsDB {
    id: number
    code: string
    type: string
    desc_en: string
    desc_fr: string
    fournisseur: string
    devise: string
    vente_gl: string
    vente_depot: number
    vente_depot_type: string
    prix: number
    taxe: number
    frais: number
    gst: number
    pst: number
    achat_gl: string
    achat_depot: number
    achat_depot_type: string
    comm: number
    comm_type: string
    comm_cat: number

}