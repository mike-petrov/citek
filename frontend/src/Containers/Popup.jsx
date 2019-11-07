import React from 'react';
// import { Link } from 'react-router-dom';


class Popup extends React.Component {
	render() {
		const {
			showPopup, onPopup,
		} = this.props;
		return (
			<>
				{showPopup.current === 'success' && (
					<div className="popup">
						<div className="popup_close_panel" onClick={() => { onPopup(false, null); }} />
						<div className="popup_content">
							<div className="popup_close" onClick={() => { onPopup(false); }}><i className="fas fa-times" /></div>
							Ваш проект успешно создан
						</div>
					</div>
				)}
			</>
		);
	}
}

export default Popup;
