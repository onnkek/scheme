function SchemeComponent({ scheme }) {

	//console.log("render SchemeComponent")
	return (
		<>
			{scheme.elements.map(e => e.drawComponent())}
		</>
	);
}

export default SchemeComponent;