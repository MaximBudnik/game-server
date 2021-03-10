import {IResolvers} from "apollo-server";
import {merge} from "../../common/merge";
import {AbstractRegistry} from "./AbstractRegistry";

class _ResolverRegistry extends AbstractRegistry<IResolvers, IResolvers> {

    combine = (): IResolvers => merge.all(this.elements);

}

export const ResolverRegistry = new _ResolverRegistry();
