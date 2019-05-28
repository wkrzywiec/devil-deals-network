'use strict';
/**
 * Devil's deals transactions logic
 */

/**
 * Devil can reject proposal made by human
 * @param {org.hell.devil.RejectProposal} rejectProposal
 * @transaction
 */
async function rejectProposal(rejectProposal) {
    
    let proposal = rejectProposal.proposal;
    proposal.status = "REJECTED";
    
    let proposalRegistry = await getAssetRegistry('org.hell.devil.Proposal');
    await proposalRegistry.update(proposal);
}

/**
 * Devil can accept proposal made by human
 * @param {org.hell.devil.MakeDeal} makeDeal
 * @transaction
 */
async function makeDeal(makeDeal) {
    
    let proposal = makeDeal.proposal;
    proposal.status = "ACCEPTED";
    
    let proposalRegistry = await getAssetRegistry('org.hell.devil.Proposal');
    await proposalRegistry.update(proposal);

    let human = proposal.human;
    let dealId = human.firstName + ':' + human.lastName + ':' + human.humanId;
    
    var factory = getFactory();
    var deal = factory.newResource('org.hell.devil', 'Deal', dealId);

    deal.dateTime = makeDeal.dateTime;
    deal.human = human;
    deal.devil = makeDeal.devil;
    deal.favour = proposal.favour;
    deal.terms = proposal.terms;

    let dealRegistry = await getAssetRegistry('org.hell.devil.Deal');
    await dealRegistry.add(deal);
}

/**
 * Devil can take human soul to hell after fullfilling the terms of a deal
 * @param {org.hell.devil.TakeSoul} takeSoul
 * @transaction
 */
async function takeSoul(takeSoul) {
    
    let deal = takeSoul.deal;
    deal.isFulfilled = true;
    let dealRegistry = await getAssetRegistry('org.hell.devil.Deal');
    await dealRegistry.update(deal);

    let devil = takeSoul.devil;
    let souls = devil.souls;
    let soul = takeSoul.soul;
    if (typeof souls === 'undefined') {
        souls = new Array();
    }
    souls.push(soul);
    devil.souls = souls;
    let devilRegistry = await getParticipantRegistry('org.hell.devil.Devil');
    await devilRegistry.update(devil);
}