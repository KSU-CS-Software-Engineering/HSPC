using System;
using System.Threading.Tasks;

namespace hspc_api.Contracts
{
    public interface IRoleService
    {
        Task<bool> CreateRole(string role);
    }
}
