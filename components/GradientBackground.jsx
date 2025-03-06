"use client";

import { useEffect, useRef } from "react";

const GradientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    canvas.style.opacity = "1";

    // Vertex Shader
    const vertexShaderSource = `
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    // Fragment Shader
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float random(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float worleyNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float minDist = 1.0;

        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random(i + neighbor) + neighbor;
            float dist = length(f - point);
            minDist = min(minDist, dist);
          }
        }
        return minDist;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float n = worleyNoise(uv * 6.0 + u_time * 0.2);

        // ปรับโทนสีให้ดำขึ้น
        vec3 color1 = vec3(5.0 / 255.0, 0.0, 15.0 / 255.0);  // ดำสนิท
        vec3 color2 = vec3(40.0 / 255.0, 0.0, 80.0 / 255.0); // ม่วงเข้ม
        vec3 color3 = vec3(100.0 / 255.0, 20.0 / 255.0, 150.0 / 255.0); // ม่วงอมดำ

        vec3 gradientColor = mix(color1, color2, uv.y * 1.5) + (n * color3 * 1.5);
        gradientColor *= 0.3; // ลดแสงให้เข้มขึ้น

        gl_FragColor = vec4(gradientColor, 1.0);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    function render(time) {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    render(0);

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        opacity: 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    />
  );
};

export default GradientBackground;






// "use client";

// import { useEffect, useRef } from "react";

// const GradientBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const gl = canvas.getContext("webgl");

//     if (!gl) {
//       console.error("WebGL not supported");
//       return;
//     }

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.width, canvas.height);

//     // Vertex Shader
//     const vertexShaderSource = `
//       attribute vec4 position;
//       void main() {
//         gl_Position = position;
//       }
//     `;

//     // Fragment Shader (สร้าง Gradient Noise)
//     const fragmentShaderSource = `
//       precision mediump float;
//       uniform vec2 u_resolution;
//       uniform float u_time;

//       float random(vec2 p) {
//         return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
//       }

//       float noise(vec2 p) {
//         vec2 i = floor(p);
//         vec2 f = fract(p);
//         float a = random(i);
//         float b = random(i + vec2(1.0, 0.0));
//         float c = random(i + vec2(0.0, 1.0));
//         float d = random(i + vec2(1.0, 1.0));
//         vec2 u = f * f * (3.0 - 2.0 * f);
//         return mix(a, b, u.x) + (c - a) * u.y * (b - d) * u.x * u.y;
//       }

//       void main() {
//         vec2 uv = gl_FragCoord.xy / u_resolution;
//         float n = noise(uv * 10.0 + u_time * 0.1);
//         vec3 color = vec3(uv.x, uv.y, n) * 0.6 + 0.4;
//         gl_FragColor = vec4(color, 1.0);
//       }
//     `;

//     function createShader(gl, type, source) {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       return shader;
//     }

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//     const program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);
//     gl.useProgram(program);

//     const positionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//       -1, -1,
//        1, -1,
//       -1,  1,
//       -1,  1,
//        1, -1,
//        1,  1
//     ]), gl.STATIC_DRAW);

//     const positionLocation = gl.getAttribLocation(program, "position");
//     gl.enableVertexAttribArray(positionLocation);
//     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

//     const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
//     const timeLocation = gl.getUniformLocation(program, "u_time");

//     function render(time) {
//       gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
//       gl.uniform1f(timeLocation, time * 0.001);
//       gl.drawArrays(gl.TRIANGLES, 0, 6);
//       requestAnimationFrame(render);
//     }

//     render(0);
    
//     // Cleanup when component unmounts
//     return () => {
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//       gl.deleteBuffer(positionBuffer);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: -1
//       }}
//     />
//   );
// };

// export default GradientBackground;

// "use client";

// import { useEffect, useRef } from "react";

// const GradientBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const gl = canvas.getContext("webgl");

//     if (!gl) {
//       console.error("WebGL not supported");
//       return;
//     }

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.width, canvas.height);

//     // Vertex Shader
//     const vertexShaderSource = `
//       attribute vec4 position;
//       void main() {
//         gl_Position = position;
//       }
//     `;

//     // Fragment Shader (Gradient Noise โทนหรูหรา)
//     const fragmentShaderSource = `
//       precision mediump float;
//       uniform vec2 u_resolution;
//       uniform float u_time;

//       float random(vec2 p) {
//         return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
//       }

//       float noise(vec2 p) {
//         vec2 i = floor(p);
//         vec2 f = fract(p);
//         float a = random(i);
//         float b = random(i + vec2(1.0, 0.0));
//         float c = random(i + vec2(0.0, 1.0));
//         float d = random(i + vec2(1.0, 1.0));
//         vec2 u = f * f * (3.0 - 2.0 * f);
//         return mix(a, b, u.x) + (c - a) * u.y * (b - d) * u.x * u.y;
//       }

//       void main() {
//         vec2 uv = gl_FragCoord.xy / u_resolution;
//         float n = noise(uv * 10.0 + u_time * 0.1);

//         // ปรับโทนสีเป็นม่วง-ดำ-น้ำเงินเข้ม
//         vec3 color1 = vec3(40.0 / 255.0, 0.0, 80.0 / 255.0); // ม่วงเข้ม
//         vec3 color2 = vec3(10.0 / 255.0, 0.0, 30.0 / 255.0); // ดำอมม่วง
//         vec3 color3 = vec3(100.0 / 255.0, 20.0 / 255.0, 150.0 / 255.0); // น้ำเงิน-ม่วง

//         vec3 gradientColor = mix(color1, color2, uv.y) + (n * color3 * 0.5);
//         gl_FragColor = vec4(gradientColor, 1.0);
//       }
//     `;

//     function createShader(gl, type, source) {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       return shader;
//     }

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//     const program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);
//     gl.useProgram(program);

//     const positionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//       -1, -1,
//        1, -1,
//       -1,  1,
//       -1,  1,
//        1, -1,
//        1,  1
//     ]), gl.STATIC_DRAW);

//     const positionLocation = gl.getAttribLocation(program, "position");
//     gl.enableVertexAttribArray(positionLocation);
//     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

//     const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
//     const timeLocation = gl.getUniformLocation(program, "u_time");

//     function render(time) {
//       gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
//       gl.uniform1f(timeLocation, time * 0.001);
//       gl.drawArrays(gl.TRIANGLES, 0, 6);
//       requestAnimationFrame(render);
//     }

//     render(0);

//     return () => {
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//       gl.deleteBuffer(positionBuffer);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: -1
//       }}
//     />
//   );
// };

// export default GradientBackground;

// "use client";

// import { useEffect, useRef } from "react";

// const GradientBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const gl = canvas.getContext("webgl");

//     if (!gl) {
//       console.error("WebGL not supported");
//       return;
//     }

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.width, canvas.height);

//     // Vertex Shader
//     const vertexShaderSource = `
//       attribute vec4 position;
//       void main() {
//         gl_Position = position;
//       }
//     `;

//     // Fragment Shader (Gradient Noise โทนหรูหรา เข้มขึ้น)
//     const fragmentShaderSource = `
//       precision mediump float;
//       uniform vec2 u_resolution;
//       uniform float u_time;

//       float random(vec2 p) {
//         return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
//       }

//       float noise(vec2 p) {
//         vec2 i = floor(p);
//         vec2 f = fract(p);
//         float a = random(i);
//         float b = random(i + vec2(1.0, 0.0));
//         float c = random(i + vec2(0.0, 1.0));
//         float d = random(i + vec2(1.0, 1.0));
//         vec2 u = f * f * (3.0 - 2.0 * f);
//         return mix(a, b, u.x) + (c - a) * u.y * (b - d) * u.x * u.y;
//       }

//       void main() {
//         vec2 uv = gl_FragCoord.xy / u_resolution;
//         float n = noise(uv * 15.0 + u_time * 0.02); // เพิ่มรายละเอียด Noise

//         // สีม่วงเข้ม - ดำ (เข้มกว่าเดิม)
//         vec3 color1 = vec3(15.0 / 255.0, 0.0, 40.0 / 255.0);  // ม่วงดำ
//         vec3 color2 = vec3(5.0 / 255.0, 0.0, 20.0 / 255.0);   // ดำสนิท
//         vec3 color3 = vec3(60.0 / 255.0, 10.0 / 255.0, 90.0 / 255.0); // ม่วงเข้ม

//         // Gradient ผสมสีแบบเข้มขึ้น
//         vec3 gradientColor = mix(color1, color2, uv.y * 1.2) + (n * color3 * 0.3);
        
//         // ลดความสว่างเพื่อให้ดูหรู
//         gradientColor *= 0.85; 

//         gl_FragColor = vec4(gradientColor, 1.0);
//       }
//     `;

//     function createShader(gl, type, source) {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       return shader;
//     }

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//     const program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);
//     gl.useProgram(program);

//     const positionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//       -1, -1,
//        1, -1,
//       -1,  1,
//       -1,  1,
//        1, -1,
//        1,  1
//     ]), gl.STATIC_DRAW);

//     const positionLocation = gl.getAttribLocation(program, "position");
//     gl.enableVertexAttribArray(positionLocation);
//     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

//     const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
//     const timeLocation = gl.getUniformLocation(program, "u_time");

//     function render(time) {
//       gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
//       gl.uniform1f(timeLocation, time * 0.001);
//       gl.drawArrays(gl.TRIANGLES, 0, 6);
//       requestAnimationFrame(render);
//     }

//     render(0);

//     return () => {
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//       gl.deleteBuffer(positionBuffer);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: -1
//       }}
//     />
//   );
// };

// export default GradientBackground;

// "use client";

// import { useEffect, useRef } from "react";

// const GradientBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const gl = canvas.getContext("webgl");

//     if (!gl) {
//       console.error("WebGL not supported");
//       return;
//     }

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.width, canvas.height);

//     // Vertex Shader
//     const vertexShaderSource = `
//       attribute vec4 position;
//       void main() {
//         gl_Position = position;
//       }
//     `;

//     // Fragment Shader (เปลี่ยน Noise เป็น Worley Noise)
//     const fragmentShaderSource = `
//       precision mediump float;
//       uniform vec2 u_resolution;
//       uniform float u_time;

//       float random(vec2 p) {
//         return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
//       }

//       float worleyNoise(vec2 p) {
//         vec2 i = floor(p);
//         vec2 f = fract(p);
//         float minDist = 1.0;

//         for (int y = -1; y <= 1; y++) {
//           for (int x = -1; x <= 1; x++) {
//             vec2 neighbor = vec2(float(x), float(y));
//             vec2 point = random(i + neighbor) + neighbor;
//             float dist = length(f - point);
//             minDist = min(minDist, dist);
//           }
//         }
//         return minDist;
//       }

//       void main() {
//         vec2 uv = gl_FragCoord.xy / u_resolution;
//         float n = worleyNoise(uv * 8.0 + u_time * 0.05);

//         vec3 color1 = vec3(10.0 / 255.0, 0.0, 30.0 / 255.0); // ดำอมม่วง
//         vec3 color2 = vec3(80.0 / 255.0, 20.0 / 255.0, 120.0 / 255.0); // ม่วงเข้ม
//         vec3 color3 = vec3(150.0 / 255.0, 80.0 / 255.0, 200.0 / 255.0); // ม่วงอมฟ้า

//         vec3 gradientColor = mix(color1, color2, uv.y) + (n * color3 * 0.6);

//         gl_FragColor = vec4(gradientColor, 1.0);
//       }
//     `;

//     function createShader(gl, type, source) {
//       const shader = gl.createShader(type);
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       return shader;
//     }

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//     const program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);
//     gl.useProgram(program);

//     const positionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//       -1, -1,
//        1, -1,
//       -1,  1,
//       -1,  1,
//        1, -1,
//        1,  1
//     ]), gl.STATIC_DRAW);

//     const positionLocation = gl.getAttribLocation(program, "position");
//     gl.enableVertexAttribArray(positionLocation);
//     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

//     const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
//     const timeLocation = gl.getUniformLocation(program, "u_time");

//     function render(time) {
//       gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
//       gl.uniform1f(timeLocation, time * 0.001);
//       gl.drawArrays(gl.TRIANGLES, 0, 6);
//       requestAnimationFrame(render);
//     }

//     render(0);

//     return () => {
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//       gl.deleteBuffer(positionBuffer);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: -1
//       }}
//     />
//   );
// };

// export default GradientBackground;






