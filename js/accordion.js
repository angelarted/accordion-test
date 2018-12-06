
//accordion constructor
function Accordion(options) {
	this.container = options.container;
	this.mainTitle = options.mainTitle;
	this.panels = options.panels;

	this.init();
}

//methods of the constructor are added to the prototype to save memery space
Accordion.prototype = {

	print: function(){
		let mainTitle = '';
		let panels = '';
		let subtitle = '';

		/******
		* definition of errors if some required option are not set
		******/
		if(this.container === undefined){
			throw new Error('Container id is a required option');
		}
		if(this.panels === undefined){
			throw new Error('Panels is a required option object');
		}
		for(i=0;i<this.panels.length;i++){
			if(this.panels[i].title === undefined){
				throw new Error('Panel Title is required');
			}
			if(this.panels[i].content === undefined){
				throw new Error('Panel Content is required');
			}
		}

		/******
		* main title is optional so if it is not given 
		* we set it as an empty string
		******/
		mainTitle = this.mainTitle !== undefined ? '<div class="ac-row ac-main_title">\
				<h2 class="heading--h2">'+this.mainTitle+'</h2>\
			</div>' : '';

		/*****
		* filling panels template
		*****/
		for (i=0; i<this.panels.length; i++){

			//subtitle is optional
			subtitle = this.panels[i].subtitle || '';

			//description (subtitle) must be limited to one row
			/*****
			* since I cannot determine which is the max character length for the subtile
			* because the accordion is fluid, i decided to use ellipsis css rule
			* to be sure every text inserted in the options we be always shown on one row
			*****/
			panelSubtitle = subtitle !== '' ? '<h4 class="heading--h4">\
				<div class="ellipsis-container">\
					'+subtitle+'\
				</div>\
			</h4>' : '';

			//real panels html template
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

		//defining the html container for the accordion
		const container = document.getElementById(this.container);

		//printing the title if exists
		if(mainTitle !== '') container.innerHTML = mainTitle;

		//priting panels into the container
		container.insertAdjacentHTML('beforeend',panels);
	},

	bindBehaviour: function(){

		//the accordion must open on click over the panel title 
		this.accordionHeader = document.querySelectorAll('.ac-panel_title');

		//binding the toggle behaviour to the accordion title
		for(i=0;i <this.accordionHeader.length;i++){
			this.accordionHeader[i].addEventListener('click',this.togglePanel,false);
		}	
	},

	togglePanel: function(e){
		//defining elements of the panel that must be animated
		let panel = e.target.parentNode;
		let content = e.target.nextElementSibling;

		/****
		* content height is needed to determine the height of the content to be
		* set through inline css, to make it work the slide-up, slide-down animation.
		* In this case the trick was to wrap the panel content into an absolute positioned
		* div (content.firstElementChild), that will be hidden by the 'content' div, 
		* which has height = 0 and 'overflow:hidden' property. Than, when the header 
		* is clicked, the height will be set to the container, and the animated property 
		* 'heigh' of the container will make the slide-up, slide-down effect
		*******/
		let contentHeight = content.firstElementChild.offsetHeight;

		/*
		* main accordion behaviour 
		*/
		if(panel.classList.contains('ac--open')){
			//simply add or remove class to the panel wrapper
			panel.classList.remove('ac--open');
			//to be used in resize function
			content.classList.remove('ac-content--open');
			//set the height of the container
			content.style.height = 0;
		} else {
			panel.classList.add('ac--open');
			content.classList.add('ac-content--open')
			content.style.height = contentHeight + 25;//25 is the containet fixed padding
		}
	},

	/*
	* resize panel content height on window resize
	*/
	onResize: function(){
		//bind behaviour to resize window event
		window.addEventListener('resize', function() {
			//find all opened panels
			let activeElement = document.querySelectorAll('.ac-content--open');
        	
        	if(activeElement.length) {
           		//calculate new height of internal absolute div 
           		//and set new height to container
        		for(i=0;i<activeElement.length;i++){
        			let newHeight = activeElement[i].firstElementChild.offsetHeight;
           			activeElement[i].style.height = newHeight + 25;//fixed padding
           		}
        	}
        });
	},

	init: function(){
		try{
			//first print the accordion html
			this.print();
			//attach behaviours to it
			this.bindBehaviour();
			//attach behaviour for resize event
			this.onResize();

		} catch(error){

			console.error(error);

		}
	}
}