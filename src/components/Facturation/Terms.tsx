import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { CHOICES } from "../../constants/select_constants";
import { ISingleProps } from "../../interface/interfaces";

const Terms = ({ data }: ISingleProps) => {


    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 mt-8">Termes et conditions</h1>
            <p> *** IMPORTANT – NOUVELLES RESTRICTIONS COVID-19*** Des restrictions plus sévères qu’à l’habitude peuvent s’appliquer en raison de la pandémie de Covid-19. Étant donné que les exigences diffèrent pour chaque pays, et peuvent changer sans préavis, il est important de vérifier les documents et/ou procédures requis par les pays de départ/retour et de destination et de vous y conformer au risque de vous voir refuser l’accès à bord. Dans cette situation, votre billet serait perdu complètement et vous pourriez vous voir obliger d’en racheter un autre. Il est aussi de votre responsabilité de télécharger l'application ArriveCAN avant votre départ du Canada. Voici quelques liens en rapport avec le Covid-19 qui pourraient vous aider. Site du gouvernement : www.tc.canada.ca/fr/initiatives/mesures-mises-jour-lignes-directrices-liees-covid-19-emises-transports-canadao Application à télécharger : Utilisez ArriveCAN : Transmettez l’information sur votre voyage d’entrée au Canada - Canada.ca Air Transat : exigence par destinations : www.airtransat.com/fr-CA/info-voyage/protection-voyageur-guide-pratiqueo Air Canada : www.aircanada.com/ca/fr/aco/home/book/travel-news-and-updates/2020/covid-19.html  République Dominicaine Sunwing: Taxe de sortie payable sur place de $20 US. ***PREUVE D'ASSURANCE MÉDICALE OBLIGATOIRE*** À partir du 30 septembre 2016, les citoyens canadiens ayant la double nationalité ne pourront rentrer au Canada par avion que s'ils présentent un passeport canadien au moment de l’embarquement pour le vol de retour. *** Il est de la responsabilité du passager de contacter la clinique santé-voyages 6 à 8 semaines avant votre départ concernant la vaccination pour toute destination. *** Toute modification au dossier est assujettie à des frais de 50$ plus TX par personne *** Pour les conditions et la description de votre achat, voir la brochure du fournisseur. ***Votre passeport doit être valide 6 mois après la date de retour de votre voyage. *** Bagage enregistré: Supplément applicable pour les vols secs, veuillez valider la tarification sur le site web des lignes aériennes respectives. ****  Il est de la responsabilité du client de vérifier et confirmer l'exactitude des informations inscrites sur la facture, le tout doit être conforme à ce que vous venez de réserver. Dans le cas contraire, veuillez nous en aviser le plus rapidement possible dans les 24 heures suivant l'envoi de votre facture (sous réserve de frais supplémentaires pour tout changement). Je reconnais avoir reçu toutes les informations nécessaires relatives aux caractéristiques du voyage acheté, telles que: prix, transports utilisés, type d'hébergement, etc... Mon agent de voyage a répondu à toutes mes questions, notamment les conséquences de la non-souscription à l'une ou l'autre des assurances voyages proposées, et je dégage Voyages GABY\MSH et ses filiales. de toute responsabilité. Je reconnais avoir donné le(s) nom(s) exact(s) inscrit(s) sur le(s) passeport(s) si applicable à ma destination. Frais annulation avant le départ: dépôt et paiement final non remboursable / Frais annulation après le départ: 100% non remboursable. Détenteur d'un permis du Québec 702872. J'ai pris connaissance des conditions brochures s'il y a lieu.</p>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Je refuse l'assurance</label>
                    <Select options={CHOICES} name="assurance" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Veuillez signer votre nom</label>
                    <input type="text" name="signature" defaultValue={data ? data.signature : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                    <textarea name="notes_final" defaultValue={data ? data.notes_final : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
            </div>
        </>
    );

}


export default Terms;