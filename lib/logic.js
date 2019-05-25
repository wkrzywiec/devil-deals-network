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


