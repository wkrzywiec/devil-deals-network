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
    
    let proposalRegistry = await getProposalReigstry('org.hell.devil.Proposal');
    proposalRegistry.update(proposal);
}

/**
 * Devil can accept proposal made by human
 * @param {org.hell.devil.MakeDeal} makeDeal
 * @transaction
 */
async function makeDeal(makeDeal) {
    
    let proposal = rejectProposal.proposal;
    proposal.status = "ACCEPTED";
    
    let proposalRegistry = await getProposalReigstry('org.hell.devil.Proposal');
    proposalRegistry.update(proposal);

    let human = proposal.human;
    let dealId = human.firstName + ':' + human.lastName + ':' + human.humanId;
    
    var factory = getFactory();
    var deal = factory.newResource('org.hell.devil', 'Deal', dealId);

    deal.dateTime = proposal.dateTime;
    deal.human = human;
    deal.devil = makeDeal.devil;
    deal.favour = proposal.favour;
    deal.terms = proposal.terms;

    let dealRegistry = await getDealRegistry('org.hell.devil.Deal');
    await dealRegistry.add(deal);
}


