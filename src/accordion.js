function Accordion(options) {
	this.container = options.container;
	this.mainTitle = options.mainTitle;
	this.panels = options.panels;

	this.init();
}

//methods of the constructor are added to the prototype to save memery space
Accordion.prototype.print = function(){

	let mainTitle = '';
	let panels = '';
	let subtitle = '';

	mainTitle = this.mainTitle !== undefined ? '<div class="ac-row ac-main_title">\
				<h2 class="heading--h2">'+this.mainTitle+'</h2>\
			</div>' : '';
	for (i=0; i<this.panels.length; i++){
		subtitle = this.panels[i].subtitle || '';
		//description must be limited to one row
		panelSubtitle = subtitle !== '' ? '<h4 class="heading--h4">'+this.panels[i].subtitle+'</h4>' : '';
		panels+= '<div class="ac-row ac-panel">\
					<div class="ac-panel_title">\
						<i class="ac-icon material-icons">keyboard_arrow_down</i>\
						<h3 class="heading--h3">'+this.panels[i].title+'</h3>\
						'+panelSubtitle+'\
					</div>\
					<div class="ac-panel_content">\
						<div class="absolute-container">\
							'+this.panels[i].content+'\
						</div>\
					</div>\
				</div>';
		}
	const container = document.getElementById(this.container);
	container.innerHTML = mainTitle;
	container.insertAdjacentHTML('beforeend',panels);
}

Accordion.prototype.bindBehaviour = function(){
	this.accordionHeader = document.querySelectorAll('.ac-panel_title') 

	for(i=0;i <this.accordionHeader.length;i++){
		this.accordionHeader[i].addEventListener('click',this.togglePanel,false);
	}
	
}

Accordion.prototype.togglePanel = function(e){
	let panel = e.target.parentNode;
	let content = e.target.nextElementSibling;
	let contentHeight = content.firstElementChild.offsetHeight;
	if(content.classList.contains('ac--open')){
		e.target.classList.remove('ac--open');
		content.classList.remove('ac--open');
		panel.classList.remove('ac--open');
		content.style.height = 0;
	} else {
		e.target.classList.add('ac--open');
		content.classList.add('ac--open');
		panel.classList.add('ac--open');
		content.style.height = contentHeight + 25;
	}	
}

Accordion.prototype.init = function(){
	this.print();
	this.bindBehaviour();
}