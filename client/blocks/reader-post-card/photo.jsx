/** @format */
/**
 * External Dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { noop, debounce } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import PostPhotoImage from './photo-image';

class PostPhoto extends React.Component {
	static propTypes = {
		post: PropTypes.object,
		site: PropTypes.object,
		title: PropTypes.string,
		onClick: PropTypes.func,
		expandCard: PropTypes.func,
		shrinkCard: PropTypes.func,
	};

	static defaultProps = {
		onClick: noop,
	};

	state = {
		cardWidth: 800,
	};

	setCardWidth = () => {
		if ( this.widthDivRef ) {
			const cardWidth = this.widthDivRef.getClientRects()[ 0 ].width;
			if ( cardWidth > 0 ) {
				this.setState( { cardWidth } );
			}
		}
	};

	handleWidthDivLoaded = ref => {
		this.widthDivRef = ref;
	};

	componentDidMount() {
		this.resizeListener = window.addEventListener( 'resize', debounce( this.setCardWidth, 50 ) );
		this.setCardWidth();
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.resizeListener );
	}

	toggleCard = () => {
		const { post, site, postKey, expandCard, shrinkCard, isExpanded } = this.props;
		isExpanded ? shrinkCard( { post, postKey } ) : expandCard( { post, site, postKey } );
	};

	render() {
		const { post, title, isExpanded, onClick, children } = this.props;

		return (
			<div className="reader-post-card__post">
				{ !! post.canonical_media.src && (
					<PostPhotoImage
						post={ post }
						title={ title }
						isExpanded={ isExpanded }
						onClick={ onClick }
						cardWidth={ this.state.cardWidth }
					/>
				) }
				<div className="reader-post-card__post-details">{ children }</div>
			</div>
		);
	}
}

export default localize( PostPhoto );
