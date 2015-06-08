if (Meteor.isClient) {

Template.list.helpers({
  items: function () {
    return Items.find({}, {sort: {tmp:-1}});
  },
  'selectedClass': function(){
	  var sensorId = this._id;
	  var selectedSensor = Session.get('selectedSensor');
	  if(sensorId == selectedSensor){
        return "selected"
      }
  }
});
Template.addDescription.events({
	'submit form': function(event){
        // code goes here
        event.preventDefault();
        var sensorDescription = event.target.description.value;
        var selectedSensor = Session.get('selectedSensor');
		Items.update(selectedSensor, {$set:{
			description: sensorDescription
			}
			});
    }	
});
Template.list.events({
	'click .sensors': function(){
		var sensorId = this._id;
		Session.set('selectedSensor', sensorId);
		
	}
	
});
}