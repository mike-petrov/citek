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
				{showPopup.current === 'successLike' && (
					<div className="popup">
						<div className="popup_close_panel" onClick={() => { onPopup(false, null); }} />
						<div className="popup_content">
							<div className="popup_close" onClick={() => { onPopup(false); }}><i className="fas fa-times" /></div>
							Спасибо за оценку проекта
						</div>
					</div>
				)}
				{showPopup.current === 'accessLike' && (
					<div className="popup">
						<div className="popup_close_panel" onClick={() => { onPopup(false, null); }} />
						<div className="popup_content">
							<div className="popup_close" onClick={() => { onPopup(false); }}><i className="fas fa-times" /></div>
							Войдите в аккаунт чтобы оценить проект
						</div>
					</div>
				)}
			</>
		);
	}
}

export default Popup;
