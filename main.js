import { eventsStore } from "./js/data.js";
import { createDomElement } from "./js/utils.js";
import { formatDate } from "./js/utils.js";

const allEventsDiv = document.querySelector(".events__allEvents");
const eventTypeSelect = document.querySelector("#event-type");
const eventDistanceSelect = document.querySelector("#event-distance");
const eventCategorySelect = document.querySelector("#event-category");

function createEvent(arr) {
  arr.forEach((eventElement) => {
    const link = createDomElement({
      tag: "a",
      className: "events__allEventsLink",
      href: "#",
    });
    allEventsDiv.append(link);
    const eventImageContainer = createDomElement({
      tag: "div",
      className: "events__allEventsImageContainer",
    });
    link.append(eventImageContainer);
    const eventImage = createDomElement({
      tag: "img",
      className: "events__allEventsImage",
      src: eventElement.image,
    });
    eventImageContainer.append(eventImage);
    const eventsDescription = createDomElement({
      tag: "div",
      className: "events__allEventsDescription",
    });
    link.append(eventsDescription);
    const eventsDate = createDomElement({
      tag: "p",
      className: "events__allEventsDate",
      textValue: formatDate(eventElement.date),
    });
    const eventsHeader = createDomElement({
      tag: "h3",
      className: "events__allEventsHeader",
      textValue: eventElement.title,
    });
    const eventsCategory = createDomElement({
      tag: "P",
      className: "events__allEventsCategory",
      textValue: eventElement.category,
    });
    eventsDescription.append(eventsDate, eventsHeader, eventsCategory);
    if (eventElement.type === "online") {
      const onlineEventImage = createDomElement({
        tag: "img",
        className: "events__allEventsOnlineEventImage",
        src: "assets/icons/online_event.svg",
        alt: "Online Event",
      });
      eventsDescription.append(onlineEventImage);
    }
    if (eventElement.attendees) {
      const eventsAtendees = createDomElement({
        tag: "p",
        className: "events__allEventsAtendees",
        textValue: `${eventElement.attendees} attendees`,
      });
      eventsDescription.append(eventsAtendees);
    }
  });
}

function clearEvents() {
  while (allEventsDiv.firstChild) {
    allEventsDiv.removeChild(allEventsDiv.firstChild);
  }
}

function filterEvents(arr) {
  let selectedType;
  if (eventTypeSelect.value === "any") {
    selectedType = undefined;
  } else {
    selectedType = eventTypeSelect.value;
  }
  let selectedDistance;
  if (eventDistanceSelect.value === "any") {
    selectedDistance = undefined;
  } else {
    selectedDistance = parseFloat(eventDistanceSelect.value);
  }
  let selectedCategory;
  if (eventCategorySelect.value === "any") {
    selectedCategory = undefined;
  } else {
    selectedCategory = eventCategorySelect.value;
  }
  const filteredArr = arr.filter(function (element) {
    return (
      (selectedType === undefined || element.type === selectedType) &&
      (selectedDistance === undefined ||
        element.distance <= selectedDistance) &&
      (selectedCategory === undefined || element.category === selectedCategory)
    );
  });
  clearEvents();
  createEvent(filteredArr);
}

eventTypeSelect.addEventListener("change", () => {
  filterEvents(eventsStore);
});
eventDistanceSelect.addEventListener("change", () => {
  filterEvents(eventsStore);
});
eventCategorySelect.addEventListener("change", () => {
  filterEvents(eventsStore);
});
createEvent(eventsStore);
