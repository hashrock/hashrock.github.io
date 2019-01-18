var handle;
project.importSVG("./assets/hashrock-icon.svg");

function onMouseDown(event) {
  handle = null;
  segment = null;

  var hitResult = project.hitTestAll(event.point, {
    fill: false,
    stroke: false,
    segments: true,
    handles: true,
    tolerance: 8
  });
  if (hitResult && hitResult[0]) {
    handle = null;
    segment = null;

    console.log(hitResult[0]);
    if (hitResult[0].type === "handle-in") {
      handle = hitResult[0].segment.handleIn;
    }
    if (hitResult[0].type === "handle-out") {
      handle = hitResult[0].segment.handleOut;
    }
    if (hitResult[0].type === "segment") {
      segment = hitResult[0].segment;
    }

    return;
  }

  //選択
  var ha = project.hitTestAll(event.point, {
    fill: true,
    stroke: true,
    segments: true
  });
  if (ha && ha[0]) {
    console.log(ha[0]);
    project.deselectAll();
    ha[0].item.fullySelected = true;
  }
}

function onMouseDrag(event) {
  console.log(handle);
  // If we hit a handle before, move it:
  if (handle) {
    handle.x += event.delta.x;
    handle.y += event.delta.y;
  }
  if (segment) {
    segment.point.x += event.delta.x;
    segment.point.y += event.delta.y;
  }
}
