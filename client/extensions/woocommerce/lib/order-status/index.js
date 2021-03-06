/** @format */
/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Custom statuses for Calypso
 *
 * These are used as collective terms for the WC core statuses,
 * grouping them by a more general point in an order lifecycle.
 */
export const ORDER_UNPAID = 'unpaid';
export const ORDER_UNFULFILLED = 'unfulfilled';
export const ORDER_COMPLETED = 'finished';

/**
 * Lists of statuses in each group, waiting for payment, waiting for
 * fulfillment, and finished orders.
 */
export const statusEditable = [ 'on-hold', 'pending' ];
export const statusWaitingPayment = [ 'on-hold', 'pending' ];
export const statusWaitingFulfillment = [ 'processing' ];
export const statusFinished = [ 'cancelled', 'completed', 'failed', 'refunded' ];
export const statusFailed = [ 'cancelled', 'failed' ];

/**
 * Get a list of order statuses for display (including a translated label)
 *
 * @return {Array} List of objects {name,value} for each status
 */
export function getOrderStatusList() {
	return [
		{
			value: 'pending',
			name: translate( 'Pending payment' ),
		},
		{
			value: 'processing',
			name: translate( 'Processing' ),
		},
		{
			value: 'on-hold',
			name: translate( 'On hold' ),
		},
		{
			value: 'completed',
			name: translate( 'Completed' ),
		},
		{
			value: 'cancelled',
			name: translate( 'Cancelled' ),
		},
		{
			value: 'refunded',
			name: translate( 'Refunded' ),
		},
		{
			value: 'failed',
			name: translate( 'Payment failed' ),
		},
	];
}

/**
 * Return a list of statuses from a given calypso label "group"
 *
 * @param {String} status Calypso version of status label
 * @return {String} A comma-separated list of WC core statuses matching this group
 */
export function getOrderStatusGroup( status ) {
	// Convert URL status to status group
	if ( ORDER_UNPAID === status ) {
		return statusWaitingPayment.join( ',' );
	} else if ( ORDER_UNFULFILLED === status ) {
		return statusWaitingFulfillment.join( ',' );
	} else if ( ORDER_COMPLETED === status ) {
		return statusFinished.join( ',' );
	}
	return status;
}

/**
 * Checks if this status (from an order) is in the "waiting for payment" group
 *
 * @param {String} status Order status
 * @return {Boolean} true if the status is awaiting payment
 */
export function isOrderWaitingPayment( status ) {
	return -1 !== statusWaitingPayment.indexOf( status );
}

/**
 * Checks if this status (from an order) is editable
 *
 * @param {String} status Order status
 * @return {Boolean} true if the status is editable
 */
export function isOrderEditable( status ) {
	return -1 !== statusEditable.indexOf( status );
}

/**
 * Checks if this status (from an order) is in the "waiting for fulfillment" group
 *
 * @param {String} status Order status
 * @return {Boolean} true if the status is awaiting fulfillment
 */
export function isOrderWaitingFulfillment( status ) {
	return -1 !== statusWaitingFulfillment.indexOf( status );
}

/**
 * Checks if this status (from an order) is in the "finished" group
 *
 * @param {String} status Order status
 * @return {Boolean} true if the status is completed, cancelled, or otherwise has no further action
 */
export function isOrderFinished( status ) {
	return -1 !== statusFinished.indexOf( status );
}

/**
 * Checks if this status (from an order) is in the "failed" group
 *
 * @param {String} status Order status
 * @return {Boolean} true if the status is cancelled or failed– not a successful order
 */
export function isOrderFailed( status ) {
	return -1 !== statusFailed.indexOf( status );
}
