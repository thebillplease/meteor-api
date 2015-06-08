Items = new Mongo.Collection('sensors');

if (Meteor.isServer) {
	

  // Global API configuration
  Restivus.configure({
    useAuth: false,
    prettyJson: true,
    apiPath: 'v1/'
  });

  // Generates: GET, POST, DELETE on /api/items and GET, PUT, DELETE on
  // /api/items/:id for Items collection
  Restivus.addCollection('sensors');

 
  // Maps to: /api/sensors
  Restivus.addRoute('sensors', {authRequired: false}, {
    get: function () {
      var sensor = Items.find().fetch();

      if (sensor) {
        return {status: 'success', data: sensor};
      }
      return {
        statusCode: 404,
        body: {status: 'fail', message: 'Sensor not found'}
      };
    },
    post: {
	    action: function () {
		var date = new Date();
		var sensor = Items.insert({
			'description': this.request.body.description,
			'freshBy': this.request.body.freshBy,
			'dateEntered': this.request.body.dateEntered,
			'category': this.request.body.category,
			'creationDate': date
			
			})

	      if (sensor) {
	        return {status: 'success', id: sensor};
	      }
	      return {
	        statusCode: 404,
	        body: {status: 'fail', message: 'Item not found'}
	      };
	    }
    }
   });
   
   // Maps to: /v1/sensors/1234

   Restivus.addRoute('sensors/:id', {authRequired: false}, {
	get: function () {
      var sensor = Items.findOne(this.urlParams.id);
      if (sensor) {
        return {status: 'success', data: sensor};
      }
      return {
        statusCode: 400,
        body: {status: 'fail', message: 'Sensor not found'}
      };
    },
    delete: {
      action: function () {
        if (Items.remove(this.urlParams.id)) {
          return {status: "success", data: {message: "Sensor removed"}};
        }
        return {
          statusCode: 404,
          body: {status: "fail", message: "Sensor not found"}
        };
      }
    }
    
    
    /* 
    post: {
      roleRequired: ['author', 'admin'],
      action: function () {
        var sensor = Items.findOne(this.urlParams.id);
        if (sensor) {
          return {status: "success", data: sensor};
        }
        return {
          statusCode: 400,
          body: {status: "fail", message: "Unable to add post"}
        };
      }
    },
    delete: {
      roleRequired: 'admin',
      action: function () {
        if (Items.remove(this.urlParams.id)) {
          return {status: "success", data: {message: "Item removed"}};
        }
        return {
          statusCode: 404,
          body: {status: "fail", message: "Item not found"}
        };
      }
    }*/
  });
  
}