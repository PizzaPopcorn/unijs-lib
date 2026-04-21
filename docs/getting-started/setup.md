# Setup and Installation

## Installation

1. Open your Unity project.
2. Go to **Window > Package Manager**.
3. Click the **+** button in the top left corner and select **Add package from git URL...**.
4. Paste the repository URL: `https://github.com/pizzapopcorn/unijs.git` (replace with the actual URL if different).
5. Click **Add**.

## Initial Configuration

Once the package is installed, you need to set up your scene:

1. **JSInstance**: Create an empty GameObject in your initial scene and attach the `JSInstance` component. This component manages the communication between Unity and JavaScript.
2. **JSKeyGameObject**: Attach this component to any GameObject you want to expose to JavaScript. Provide a unique **Key** for each. You can access children of these objects from JS even if they don't have their own key.
3. **Project Settings**:
   - Go to **Edit > Project Settings > UniJS**.
   - Here you can configure if you want to include the CDN script and if you want to inject the controller script automatically.

## Building for WebGL

1. Go to **File > Build Settings**.
2. Select **WebGL** as the platform.
3. Ensure your scene is in the **Scenes in Build** list.
4. (Optional) Check **Development Build** for easier debugging.
5. Click **Build**.

## Local Server

WebGL builds cannot be run by simply opening the `index.html` file from your file system. You must serve it through a local web server.
- If you use **Rider**, it has a built-in server.
- You can use `npx serve` or any other static file server.
