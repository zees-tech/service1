import { Container } from "inversify";
import { interfaces, TYPE } from "inversify-express-utils";

// const controllerConfig = <T>(
//   controller: new (...args: any[]) => T,
//   types: Record<string, symbol>,
//   container: Container
// ) => {
//   const controllerName = controller.name; // Get class name as string

//   // Add the controller to the types mapping dynamically
//   const Types = {
//     ...types,
//     [controllerName]: Symbol.for(controllerName),
//   };

//   // Bind the controller class to Inversify's container
//   container.bind<T>(Types[controllerName]).to(controller).inRequestScope();

//   return Types; // Return updated types object
// };

export const registerController = <T extends interfaces.Controller>(
  controller: new (...args: any[]) => T,
  container: Container
) => {
  const controllerName = controller.name; // Get class name as string

  // Bind the controller class to Inversify's container
  container.bind<interfaces.Controller>(TYPE.Controller).to(controller).whenTargetNamed(controllerName);
};

export default registerController;
