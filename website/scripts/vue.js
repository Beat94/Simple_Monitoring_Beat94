var app = new Vue({
	el: '#output',
	data:{
		test: 'Hallo Test',
		application: 'empty'
	},
	mounted(){
		axios
			.get('http://localhost:8080/api/application/')
			.then(response => {this.application = response.data})
	}
})