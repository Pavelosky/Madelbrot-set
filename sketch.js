let minReal = -0.5;
let maxReal = 0.5;

let realMinSlider;
let realMaxSlider;

function setup() {
  // Create canvas
  createCanvas(600, 600);
  // Set pixel density to 1
  pixelDensity(1);
  
  // Create sliders for minimum and maximum real values
  realMinSlider = createSlider(-2.5, 0, -2.5, 0.01);
  realMaxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
  // Set maximum number of iterations
  let maxIterations = 100;
  // Load pixels
  loadPixels();

  // Loop through each x and y value on the canvas
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      
      // Map x and y values to the real and imaginary parts
      let realPart = map(x, 0, width, realMinSlider.value(), realMaxSlider.value());
      let imaginaryPart = map(y, 0, height, realMinSlider.value(), realMaxSlider.value());

      // Store original real and imaginary parts for later use
      let constantReal = realPart;
      let constantImaginary = imaginaryPart;

      // Keep track of iteration number
      let iteration = 0;

      // Loop until maximum number of iterations is reached
      while (iteration < maxIterations) {
        // Calculate next real and imaginary parts
        let nextReal = realPart * realPart - imaginaryPart * imaginaryPart;
        let nextImaginary = 2 * realPart * imaginaryPart;

        // Update real and imaginary parts
        realPart = nextReal + constantReal;
        imaginaryPart = nextImaginary + constantImaginary;
        
        // Break loop if magnitude is larger than 16
        if (abs(realPart + imaginaryPart) > 16) {
          break;
        }
        iteration++;
      }

      // Calculate brightness based on iteration number
      let brightness = map(iteration, 0, maxIterations, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255); 

      // Set brightness to 0 if maximum iterations is reached
      if (iteration === maxIterations) {
        brightness = 0;
      }

      // Calculate pixel index
      let pixelIndex = (x + y * width) * 4;
      // Set pixel values for red, green, and blue channels
      pixels[pixelIndex + 0] = brightness;
      pixels[pixelIndex + 1] = brightness;
      pixels[pixelIndex + 2] = brightness;
      // Set pixel value for alpha channel to full opacity
      pixels[pixelIndex + 3] = 255;
    }
  }
  // Update canvas with new pixels
  updatePixels();
}
