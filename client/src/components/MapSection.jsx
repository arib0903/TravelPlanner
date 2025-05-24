import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MapSection = () => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);

  // Initialize the map
  useEffect(() => {
    // Load Google Maps script with Places library
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !searchBoxRef.current) return;

    // Create new map instance
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
      zoom: 12,
      mapTypeId: 'roadmap',
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // Initialize SearchBox
    const searchInput = searchBoxRef.current;
    const searchBox = new window.google.maps.places.SearchBox(searchInput);

    // Bias SearchBox results towards current map's viewport
    newMap.addListener('bounds_changed', () => {
      searchBox.setBounds(newMap.getBounds());
    });

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) return;

      // For each place, get the icon, name and location.
      places.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        // Create a marker for the searched place
        const marker = new window.google.maps.Marker({
          map: newMap,
          position: place.geometry.location,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });

        // Create info window with place details
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div class="p-2"><strong>${place.name}</strong><br>${place.formatted_address}</div>`
        });

        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.open(newMap, marker);
        });

        // Add to state
        const newPlace = {
          id: Date.now().toString(),
          name: place.name,
          address: place.formatted_address,
          marker: marker,
          infoWindow: infoWindow
        };

        setPlaces(prev => [...prev, newPlace]);

        // Pan to the selected location
        newMap.panTo(place.geometry.location);
        newMap.setZoom(15);
      });

      // Clear the search box
      searchInput.value = '';
    });

    setMap(newMap);
  };

  const removePlace = (placeId) => {
    const placeToRemove = places.find(place => place.id === placeId);
    if (placeToRemove) {
      placeToRemove.marker.setMap(null);
      placeToRemove.infoWindow.close();
      setPlaces(prev => prev.filter(place => place.id !== placeId));
    }
  };

  const clearAll = () => {
    places.forEach(place => {
      place.marker.setMap(null);
      place.infoWindow.close();
    });
    setPlaces([]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(places);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaces(items);
  };

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Interactive Map</h2>
        <p className="text-gray-600 mb-4">Search for locations to add them to your itinerary!</p>
        
        {/* Search Box */}
        <div className="max-w-xl mx-auto mb-4">
          <input
            ref={searchBoxRef}
            type="text"
            placeholder="Search for a location..."
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
        >
          Clear All Locations
        </button>
      </div>

      <div className="flex gap-6">
        {/* Map Container */}
        <div 
          ref={mapRef} 
          className="w-2/3 h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200"
        ></div>

        {/* Itinerary List */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Your Itinerary</h3>
          {places.length === 0 ? (
            <p className="text-gray-500 italic">Search for locations to add them to your itinerary!</p>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="places">
                {(provided) => (
                  <ul 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {places.map((place, index) => (
                      <Draggable 
                        key={place.id} 
                        draggableId={place.id} 
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg 
                              ${snapshot.isDragging ? 'shadow-lg bg-teal-50' : 'hover:bg-gray-100'} 
                              transition-all duration-200`}
                          >
                            <div className="flex items-center flex-1 min-w-0">
                              <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center mr-3 shrink-0">
                                {index + 1}
                              </span>
                              <div className="flex flex-col min-w-0">
                                <span className="text-gray-700 font-medium truncate">{place.name}</span>
                                <span className="text-gray-500 text-sm truncate">{place.address}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => removePlace(place.id)}
                              className="text-red-500 hover:text-red-700 p-1 ml-2 shrink-0"
                              title="Remove location"
                            >
                              ✕
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection; 