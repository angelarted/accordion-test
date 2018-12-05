function Accordion(options) {
	this.container = options.container;
	this.mainTitle = options.mainTitle;
	this.panels = options.panels;

	this.init();
}

//methods of the constructor are added to the prototype to save memery space
Accordion.prototype.print = function(){
	const template = '<div class="ac-row ac-main_title">\
				<h2 class="heading--h2">'+this.mainTitle+'</h2>\
			</div>';
	var panels = '';
	for (i=0; i<this.panels.length; i++){
		panels+= '<div class="ac-row ac-panel">\
					<div class="ac-panel_title">\
						<i class="ac-icon material-icons">keyboard_arrow_down</i>\
						<h3 class="heading--h3">'+this.panels[i].title+'</h3>\
						<h4 class="heading--h4">'+this.panels[i].subtitle+'</h4>\
					</div>\
					<div class="ac-panel_content">\
						<div class="absolute-container">\
							'+this.panels[i].content+'\
						</div>\
					</div>\
				</div>';
		}
	const container = document.getElementById(this.container);
	container.innerHTML = template;
	container.insertAdjacentHTML('beforeend',panels);
}

Accordion.prototype.bindBehaviour = function(){
	this.accordionHeader = document.querySelectorAll('.ac-panel_title') 

	for(i=0;i <this.accordionHeader.length;i++){
		console.log('o')
		this.accordionHeader[i].addEventListener('click',this.togglePanel,false);
	}
	
}

Accordion.prototype.togglePanel = function(e){
	let content = e.target.nextElementSibling;
	let contentHeight = content.firstElementChild.offsetHeight;
	console.log(contentHeight)
	if(content.classList.contains('ac--open')){
		content.style.height = 0;
		content.classList.remove('ac--open');
	} else {
		content.classList.add('ac--open');
		content.style.height = contentHeight + 25;
	}	
}

Accordion.prototype.init = function(){
	this.print();
	this.bindBehaviour();
}