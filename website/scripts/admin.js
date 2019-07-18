var app = new Vue({
	el: '#inputgui',
	data:{
		test: "hallo teschtli",
		applications: "empty",
		application: "",
		choosen: "",
		problems: [
			{text: "Gut", value: 0},
			{text: "Mittel", value: 1},
			{text: "Schlecht", value: 2},
		],
		auswirkung: "-",
		loesung: "-",
		zeit: 0,
		message: ""
	},
	mounted(){
		axios
			.get('http://localhost:8080/api/application/')
			.then(response => {this.applications = response.data})
	},
	methods: {
		send: function() {
			axios
				.put('http://localhost:8080/api/application/' + this.application, {
					problem: this.choosen,
					auswirkung: this.auswirkung,
					loesung: this.loesung,
					termin: this.zeit,
				})
				.then(response => {})
				.catch(e => {
					console.error(e)
				})
		}
	}
});