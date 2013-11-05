'use strict';

var imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
var imageExtensionsRegexps = _.map(imageExtensions, function (imageExtension) {
	return new RegExp('\.' + imageExtension + '$', 'i');
});

var determineImageLinkElements = function () {
	var displayedLinkElements = $('#file_list a');
	
	var imageLinkElements = _.filter(displayedLinkElements, function (linkElement) {
		return _.any(imageExtensionsRegexps, function (regexp) {
			return regexp.test(linkElement.href);
		})
	});
	
	return imageLinkElements;
};

var previewElement = document.createElement('img');
previewElement.style.position = 'absolute';
previewElement.style.top = '10px';
previewElement.style.right = '10px';
previewElement.style.maxHeight = '75%';
previewElement.style.maxWidth = '75%';
document.body.appendChild(previewElement);

var bindHoverActions = function () {
	var onMouseEnter = function () {
		previewElement.src = this.href;
	};
	
	var onMouseLeave = function () {
		previewElement.src = null;
	};
	
	_.each(determineImageLinkElements(), function (imageLinkElement) {
		$(imageLinkElement).off('hover');
		$(imageLinkElement).hover(onMouseEnter, onMouseLeave);
	})
};

$('#file_list').on('DOMSubtreeModified', _.debounce(bindHoverActions, 200));