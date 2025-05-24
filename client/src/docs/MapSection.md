# MapSection Component Documentation

## Overview

The MapSection component is an interactive map interface that allows users to search for locations, add them to an itinerary, and reorder them using drag and drop functionality. It uses Google Maps API for map display and location search.

## Dependencies

```javascript
import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
```

- `useState`: Manages state for map instance and places list
- `useEffect`: Handles lifecycle events and Google Maps initialization
- `useRef`: Creates references to DOM elements
- `react-beautiful-dnd`: Provides drag and drop functionality for reordering places

## Component Structure

### State and Refs

```javascript
const mapRef = useRef(null); // Holds reference to map container div
const searchBoxRef = useRef(null); // Holds reference to search input field
const [map, setMap] = useState(null); // Stores Google Maps instance
const [places, setPlaces] = useState([]); // Stores array of selected places
```

### Google Maps Initialization

```javascript
useEffect(() => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
```

- Creates script element to load Google Maps API
- Uses environment variable for API key
- Includes Places library for location search functionality

### Map Setup Function

```javascript
const initMap = () => {
  // Map configuration
  const newMap = new window.google.maps.Map(mapRef.current, {
    center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
    zoom: 12,
    mapTypeId: 'roadmap',
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  });
```

- Creates new Google Map instance
- Sets initial center to New York City
- Configures map controls and options

### Search Box Implementation

```javascript
const searchBox = new window.google.maps.places.SearchBox(searchInput);
newMap.addListener("bounds_changed", () => {
  searchBox.setBounds(newMap.getBounds());
});
```

- Creates Google Places SearchBox for location search
- Updates search results based on current map bounds
- Improves search relevance for visible area

### Place Selection Handler

```javascript
searchBox.addListener('places_changed', () => {
  const places = searchBox.getPlaces();
  places.forEach(place => {
    // Create marker
    const marker = new window.google.maps.Marker({
      map: newMap,
      position: place.geometry.location,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new window.google.maps.Size(40, 40)
      }
    });
```

- Handles place selection from search results
- Creates animated marker for selected location
- Customizes marker appearance and size

### Info Window Creation

```javascript
const infoWindow = new window.google.maps.InfoWindow({
  content: `<div class="p-2"><strong>${place.name}</strong><br>${place.formatted_address}</div>`,
});

marker.addListener("click", () => {
  infoWindow.open(newMap, marker);
});
```

- Creates info window for each marker
- Shows place name and address
- Opens when marker is clicked

### Place State Management

```javascript
const newPlace = {
  id: Date.now().toString(),
  name: place.name,
  address: place.formatted_address,
  marker: marker,
  infoWindow: infoWindow,
};

setPlaces((prev) => [...prev, newPlace]);
```

- Creates place object with unique ID
- Stores place information and references
- Updates places array in state

### Place Removal

```javascript
const removePlace = (placeId) => {
  const placeToRemove = places.find((place) => place.id === placeId);
  if (placeToRemove) {
    placeToRemove.marker.setMap(null); // Removes marker from map
    placeToRemove.infoWindow.close(); // Closes info window
    setPlaces((prev) => prev.filter((place) => place.id !== placeId));
  }
};
```

- Removes place from itinerary
- Cleans up markers and info windows
- Updates state to reflect removal

### Clear All Function

```javascript
const clearAll = () => {
  places.forEach((place) => {
    place.marker.setMap(null); // Removes all markers
    place.infoWindow.close(); // Closes all info windows
  });
  setPlaces([]); // Clears places array
};
```

- Removes all places from itinerary
- Cleans up all map elements
- Resets state to empty

### Drag and Drop Implementation

```javascript
const handleDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(places);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setPlaces(items);
};
```

- Handles drag and drop reordering
- Updates place order in state
- Maintains marker and info window references

## UI Components

### Search Input

```javascript
<input
  ref={searchBoxRef}
  type="text"
  placeholder="Search for a location..."
  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
/>
```

- Search input field with Google Places integration
- Styled with Tailwind CSS
- Connected to SearchBox functionality

### Map Container

```javascript
<div
  ref={mapRef}
  className="w-2/3 h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200"
></div>
```

- Container for Google Map
- Takes up 2/3 of available width
- Styled with borders and shadow

### Itinerary List

```javascript
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="places">
    {(provided) => (
      <ul {...provided.droppableProps} ref={provided.innerRef}>
```

- Implements drag and drop context
- Creates droppable area for places
- Handles reordering functionality

### Place Item

```javascript
<Draggable key={place.id} draggableId={place.id} index={index}>
  {(provided, snapshot) => (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg
        ${snapshot.isDragging ? 'shadow-lg bg-teal-50' : 'hover:bg-gray-100'}`}
    >
```

- Individual place item in itinerary
- Includes drag handle and animation
- Shows place number, name, and address
- Includes remove button

## Usage Instructions

1. **Search for Location**:

   - Type location name in search box
   - Select from autocomplete suggestions
   - Location is added to map and itinerary

2. **View Place Details**:

   - Click marker on map to see info window
   - View full address in itinerary list

3. **Manage Itinerary**:

   - Drag and drop to reorder places
   - Click ✕ to remove individual places
   - Use "Clear All" to remove everything

4. **Visual Feedback**:
   - Markers animate when placed
   - Items highlight when dragging
   - Hover effects on interactive elements

## Best Practices Implemented

1. **Performance**:

   - Uses refs to avoid unnecessary rerenders
   - Efficient state updates
   - Cleanup on component unmount

2. **User Experience**:

   - Smooth animations
   - Clear visual feedback
   - Intuitive drag and drop

3. **Code Organization**:

   - Logical function grouping
   - Clear state management
   - Consistent error handling

4. **Styling**:
   - Responsive layout
   - Consistent design
   - Accessible color contrast
